const User = require("../models/user.model");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    try {
        const { username, password, full_name } = req.body;
        if (!username || !password || !full_name) return res.status(400).send({ message: "Thiếu dữ liệu!" });

        const hashedPassword = bcrypt.hashSync(password, 8);
        const savedUser = await User.create({ username, password: hashedPassword, full_name, role: 'USER' });
        res.status(201).send({ id: savedUser.id, username: savedUser.username, full_name: savedUser.full_name, role: savedUser.role });
    } catch (err) {
        res.status(500).send({ message: "Lỗi MariaDB: " + err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByUsername(username);

        if (!user) return res.status(401).send({ message: "Sai tài khoản/mật khẩu!" });
        
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).send({ message: "Sai tài khoản/mật khẩu!" });

        const token = jwt.sign({ id: user.id, role: user.role }, config.secret, { expiresIn: config.jwtExpiration });
        res.status(200).send({ id: user.id, username: user.username, role: user.role, accessToken: token });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const data = await User.findAll();
        res.status(200).send(data);
    } catch (err) { res.status(500).send({ message: err.message }); }
};

exports.findOne = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user ? res.status(200).send(user) : res.status(404).send({ message: "Không tìm thấy!" });
    } catch (err) { res.status(500).send({ message: err.message }); }
};

exports.delete = async (req, res) => {
    try {
        await User.deleteById(req.params.id);
        res.status(200).send({ message: "Xóa thành công!" });
    } catch (err) { res.status(500).send({ message: err.message }); }
};