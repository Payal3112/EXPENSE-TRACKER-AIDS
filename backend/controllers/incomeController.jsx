const User = require("../models/User");
const Income = require("../models/Income");


//Add Income Source
exports.addIncome = async (req , res) => {
    const userId = req.user.id;
 try{
    const { icon, source, amount, date } = req.body;

    //Validation:Check for missing feilds
    if(!source || !amount || !date) {
        return res.status(400).json({ message: "All feilds are required" });
    }
 const newIncome = new Income({
    userId,
    icon,
    source,
    amount,
    date: new Date(date)
 });
 await newIncome.save();
 res.status(200).json(newIncome);
}catch (error){
    res.status(500).json({message: "Server Error" });
};

}

//Get All Income Source
exports.getAllIncome = async (req , res) => {}

//Delete All Income Source
exports.deleteIncome = async (req , res) => {}

//Download Excel
exports.downloadIncomeExcel = async (req , res) => {}