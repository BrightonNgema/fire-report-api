module.exports = resolvers = {
  Query: {
    reports: async (root, args, { Report }) => {
      const allReports = await Report.find().sort({ createdDate: "desc" });
      return allReports;
    }
  },
  Mutation: {
    addReport: async (root, { input }, { Report }) => {
      console.log(input);
      const newReport = await new Report({
        ...input,
      }).save();
      return newReport;
    }
  }
};
