const express = require("express");
const cors = require("cors");
const zod=require("zod");
const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");
const { NGO, User } = require("./db");

const app=express();

app.use(express.json());
app.use(cors());

const ngosignupBody=zod.object({
    ngoName: zod.string(),
	email: zod.string().email('Invalid email address'),
	password: zod.string(),
	phoneNo: zod.string().refine((val) => /^\d{10}$/.test(val), {
    message: "Phone number must be exactly 10 digits"
  }),
    city:zod.string()
})

app.post("/ngo/signup",async(req,res)=>{
    try{const {success}=ngosignupBody.safeParse(req.body);
    if(!success){
        return res.status("411").json({
            msg:"incorrect Inputs"
        })
    }

    const existingUser= await NGO.findOne({
        email:req.body.email
    })

    if(existingUser){
        return res.status(411).json({
            message: "existing user"
        })
    }

    const user = await NGO.create({
        ngoName: req.body.ngoName,
        email: req.body.email,
        password: req.body.password,
        phoneNo: req.body.phoneNo,
        city:req.body.city
    })

    const token = jwt.sign({
       user: user.ngoName
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })} catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

const ngosigninBody = zod.object({
    email: zod.string().email(),
	password: zod.string()
    
})

app.post("/ngo/signin", async (req, res) => {
    try{const { success } = ngosigninBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "incorrect input"
        })
    }

    const user = await NGO.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            user:user._id      //yha kuch prblm ho skti hai
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })}catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

const signupBody=zod.object({
    userName: zod.string(),
	email: zod.string().email('Invalid email address'),
	password: zod.string(),
	phoneNo: zod.string().refine((val) => /^\d{10}$/.test(val), {
    message: "Phone number must be exactly 10 digits"
  })
})

app.post("/signup",async(req,res)=>{
    try{const {success}=signupBody.safeParse(req.body);
    if(!success){
        return res.status("411").json({
            msg:"incorrect Inputs"
        })
    }

    const existingUser= await User.findOne({
        email:req.body.email
    })

    if(existingUser){
        return res.status(411).json({
            message: "existing user"
        })
    }

    const user = await User.create({
        userName: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phoneNo: req.body.phoneNo,
    })

    const token = jwt.sign({
       userName: user.userName
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
}
})

const signinBody = zod.object({
    email: zod.string().email(),
	password: zod.string()
})

app.post("/signin", async (req, res) => {
   try{ const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "incorrect input"
        })
    }

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            user:user._id      //yha kuch prblm ho skti hai
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })}catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

const cityBody=zod.string();
app.get("/ngo/:city",async (req,res)=>{
    const {city}=req.params;
    const {success}=cityBody.safeParse(city);
    if(!success){
        return res.status(400).json({
            message: "Invalid city parameter"
        });
    }
    try {
        const ngos = await NGO.find({ city: city });
        res.json(ngos);
    } catch (error) {
        console.error("Error fetching NGOs:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})
app.listen(3000);
