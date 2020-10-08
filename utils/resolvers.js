const jwt = require("jsonwebtoken");
const moment = require("moment");
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
    },
    report: async (root, { id }, { Report, currentUser }) => {
      const report = await Report.findOne({ _id: id });

      return report;
    }
  },
  Mutation: {
    registerUser: async (root, { input }, { User }) => {
      const userExists = await User.findOne({
        cellnumber: input.cellnumber,
        deviceId: input.deviceId
      });
      console.log(userExists);
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
        "address.fulladdress": input.address.fulladdress
      });
      if (report) {
        const after30 = moment(report.createdDate).add(30, "minutes");
        const is30 = new Date() >= after30.toDate();
        const isUser =
          report.deviceId === currentUser.deviceId &&
          report.cellnumber === currentUser.cellnumber;
        const isUpdate = (isUser && is30) || !isUser;

        if (!isUpdate) return report;
        const newLevel = report.level === "LOW" ? "MEDIUM" : "HIGH";
        const newReport = await Report.findOneAndUpdate(
          {
            "address.fulladdress": input.address.fulladdress
          },
          { level: newLevel },
          { new: true, returnOriginal: false }
        );
        return newReport;
      }
      return await new Report({
        ...input,
        cellnumber: currentUser.cellnumber,
        deviceId: currentUser.deviceId
      }).save();
    }
  }
};
