import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js '
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse   } from '../utils/ApiResponse.js'
 

const registerUser = asyncHandler (async (req, res) => {

    // Algorithm :

        // get user details from frontend

        // validation - check if any of fields are empty

        // check if user already exits - username, email

        // check for images and avatar

        // upload them to cloudinary

        // create user object - create entry in db

        // remove password and refresh token from response

        // check for user creation

        // return response

    
    // from ra json dekhi aako data req.body() ma pauxa tara url bata aako data paudaina
    const {fullName, email, username, password} = req.body

    console.log('email : ', email)

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError (400, "ALl fields are required.")
    }

    const existedUser = await User.findOne({
        $or : [{ username }, { email }]
    }) 
    if (existedUser) {
        throw new ApiError (409 , "User with same username or email already exits.")
    }

    // req.body ko access express le by default dinxa vane req.files ko access multer le dinxa.
    const avatarLocalPath = req.files?.avatar[0]?.path  
    // const coverImageLocalPath = req.files?.coverImage[0]?.path

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if ( ! avatarLocalPath ){
        throw new ApiError (400, "Avatar Image is required.")
    }

    const avatar = await uploadOnCloudinary (avatarLocalPath)
    const coverImage = await uploadOnCloudinary (coverImageLocalPath)

    if (!avatar) {
        throw new ApiError (400, "Avatar Image is required.")
    }

    const user = await User.create({
        fullName,
        avatar : avatar.url,
        coverImage : coverImage?.url || "", // As cover image is not compulsory... code fatna bata jogauna ... make it empty if not provided by user.
        email,
        password,
        username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshYToken")

    if (!createdUser) {
        throw new ApiError (500, "Something went wrong while registering the user.")
    }

    return res.status(201).json(
        new ApiResponse (200, createdUser, "User registered successfully !")
    )


})


export { registerUser }