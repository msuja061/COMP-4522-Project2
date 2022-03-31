



module.exports = async function (context, req) {

    const uri = "mongodb+srv://sqladminuser:@comp4522nosql.ljbwa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    context.res = {
        headers: { 'Content-Type': 'application/json' },
        body: { res: 'Hello, World' }
    };
}