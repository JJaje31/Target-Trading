const User = require('../models/createUser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const axios = require('axios')
require('dotenv').config();
const stockStatus = process.env.USER_STOCK_STATUS;
const stockAdviser = process.env.STOCKMARKET_ADVISER


const newUser = async (req, res) => {
    try {
        const { createUsername, email, password } = req.body;

        const newUser = new User({
            username: createUsername,
            email: email,
            password: password,
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        return res.status(400).json({ message: `Username is already taken` });
    }
};

signIn = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        const isMatch = await bcrypt.compare(req.body.password, user.passwordHash);
        if (!isMatch) {
            res.status(400).json({ error: 'Invalid username or password' });
        } else {
            const payload = {
                username: user.username,
                userId: user._id,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1hr' });
            res.status(200).json({
                message: 'Login was successful',
                token
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

investmentAI = async (req, res) => {
    const { question } = req.body;
    const { userId } = req.user;

    try {
        const flowiseResponse = await axios.post(stockAdviser,
            { question },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userId}`, 
                },
            }
        );
        res.json(flowiseResponse.data)
    } catch (err) {
        console.error('Error communicating with Flowise agent:', err);
        res.status(500).json({ err: 'Failed to process the request' });
    }
}

addStock = async (req, res) => {
    try {
        const { userId } = req.user;
        const { stock, shares } = req.body;
    
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const existingStock = user.stocks.find((s) => s.stock === stock);
        if (existingStock) {
            return res.status(400).json({ message: 'Stock already exists.' });
        }
        user.stocks.push({
            stock,
            shares,
        });
        await user.save();

        res.status(200).json({ message: 'Stock saved successfully.' });
        console.log('Stock saved.');
    } catch (error) {
        console.error('Error adding stock:', error);
        res.status(500).json({ message: 'An error occurred.' });
    }
}

userStocks = async (req, res) => {
    try {
        const { userId } = req.user
        if (userId) {
            const user = await User.findById(userId);
            res.status(200).json({
                message: 'Stocks loaded successfully',
                stocks: user.stocks
            })
        }


    } catch (err) {
        console.log(err)

    }
}

deleteStock = async (req, res) => {
    try {
        const { userId } = req.user
        const { id } = req.params
        console.log(id)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const deletedItem = user.stocks.pull({ _id: id });
       await user.save()
        res.sendStatus(200).json({ message: 'Item deleted sucessfully!!' })
    } catch (err) {
        console.log(err)
        res.status(500)
    }
}

addShare = async (req, res) => {
    try {
        const { userId } = req.user;
        const { id } = req.params;
        const { shares } = req.body;
        const numShare = parseInt(shares)
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const stock = user.stocks.id(id);
        if (!stock) {
            return res.status(404).json({ error: "Stock not found" });
        }
        stock.shares += numShare;
        await user.save()
        res.status(200).json({ message: "Shares updated successfully", stock });



    } catch (err) {
        console.log(err)
    }

}

myStockInvestmentAI = async (req, res) => {
    const { stock } = req.body;
    const { shares } = req.body;
    const question = `What is my stock update for ${stock} I have ${shares} shares`;
    try {



        const flowiseResponse = await axios.post(stockStatus,
            { question },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        if (flowiseResponse.status === 200) {
            res.json(flowiseResponse.data)
        } else {
            res.status(400).json({ message: 'This is not a legit stock!! Please delete!!' })
        }
    } catch (err) {
        console.log(err)
    }


}



module.exports = {
    myStockInvestmentAI,
    addShare,
    deleteStock,
    userStocks,
    newUser,
    signIn,
    investmentAI,
    addStock
}