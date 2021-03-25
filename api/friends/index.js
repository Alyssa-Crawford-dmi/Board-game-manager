module.exports = async function(context, req) {
  const method = req.method.toLowerCase();

  switch (method) {
    case "post":
      context.bindings.tableOut = [];
      const inviter = context.bindings.req.params.inviter;
      const invitee = context.bindings.req.params.invitee;
      //   console.log(context.bindings.req.params);
      const RowKey =
        invitee < inviter ? `${invitee}*${inviter}` : `${inviter}*${invitee}`;
      context.bindings.tableOut.push({
        PartitionKey: "friends",
        RowKey,
        inviter,
        invitee,
        pending: true,
      });
      context.done();
  }
};
