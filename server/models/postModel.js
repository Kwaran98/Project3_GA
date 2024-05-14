const {Schema,model} = require ("mongoose")

const postSchema  = new Schema ({
    title: {type: String, required:true},
    category: {type: String, enum:["Full Time Students", "Part Time Students", "Teaching Assistants", "Alumni", "Software Engineer", "Uncategorized"], message : "Value is not supported"},
    description: {type: String, required:true},
    creator: {type: Schema.Types.ObjectId, ref:"User"},
    thumbnail: {type: String, required:true},

}, {timestamps:true})


module.exports = model ( "Post", postSchema)