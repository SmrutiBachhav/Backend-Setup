//using promises
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
}


export { asyncHandler }

//using try catch 

//HigherOrderFunction can take function as parameter or return function. treat function as variable
// const asyncHandler = () => {}    basic
// const asyncHandler = (fn) => () => {}    pass fnction as param
// const asyncHandler = (fn) => {() => {}}
//const asyncHandler = (fn) => async () => {}     removed {} async fun
//below is as above take a function and pass it to another further func and make it async 
// const asyncHandler = (fn) => async(req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             messae:error.message
//         })
//     }
// }


