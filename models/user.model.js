// const mongoose = require("mongoose")

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("crud", schema);
  
  return User;
};

// module.exports = mongoose => {
//     const User = mongoose.model(
//       "crud",
//       mongoose.Schema(
//         {
//           title: String,
//           description: String,
//           published: Boolean
//         },
//         { timestamps: true }
//       )
//     );
  
//     return User;
//   };