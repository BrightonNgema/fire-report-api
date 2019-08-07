const jwt = require("jsonwebtoken");

const createToken = (newUser, secret) => {
  const { _id, cellnumber, deviceId } = newUser;
  const expiresIn = "365d";
  const token = jwt.sign({ _id, cellnumber, deviceId }, secret, { expiresIn });

  return { token };
};

module.exports = resolvers = {
  Query: {
    reports: async (root, args, { Report, currentUser }) => {
      const allReports = await Report.find().sort({ createdDate: "asc" });

      return allReports;
    }
  },
  Mutation: {
    registerUser: async (root, { input }, { User }) => {
      const userExists = await User.findOne({
        cellnumber: input.cellnumber,
        deviceId: input.deviceId
      });

      if (userExists) {
        const user = {
          _id: userExists._id,
          cellnumber: userExists.cellnumber,
          deviceId: userExists.deviceId
        };
        return createToken(user, process.env.JWT_SECRET);
      }
      const newUser = await new User({
        ...input
      }).save();

      if (!newUser) throw new Error("Error User Registration");
      const token = createToken(newUser, process.env.JWT_SECRET);
      return token;
    },
    addReport: async (root, { input }, { Report, currentUser }) => {
      if (!currentUser) throw new Error("Not authorized");
      var start = new Date();
      start.setHours(0, 0, 0, 0);
      var end = new Date();
      end.setHours(23, 59, 59, 999);

      const report = await Report.findOne({
        createdDate: { $gte: start, $lt: end },
        deviceId: currentUser.deviceId,
        address: {
          geo: input.address.geo,
          fulladdress: input.address.fulladdress
        }
      });
      if (report) {
        const newLevel = report.level === "LOW" ? "MEDIUM" : "HIGH";
        return await Report.findOneAndUpdate(
          {
            cellnumber: currentUser.cellnumber,
            deviceId: currentUser.deviceId
          },
          { level: newLevel },
          { new: false, returnOriginal: false }
        );
      }
      return await new Report({
        ...input,
        cellnumber: currentUser.cellnumber,
        deviceId: currentUser.deviceId
      }).save();
    }
  }
};
