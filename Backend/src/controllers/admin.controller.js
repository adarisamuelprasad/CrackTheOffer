const userModel = require("../models/user.model");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * @name getAllUsers
 * @description Fetch all registered users (Admin only)
 */
async function getAllUsers(req, res) {
    try {
        const users = await userModel.find({}, '-password').sort({ createdAt: -1 });
        res.status(200).json({
            message: "Users fetched successfully",
            users
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching users", error: err.message });
    }
}

/**
 * @name getAllReports
 * @description Fetch all interview reports across the platform (Admin only)
 */
async function getAllReports(req, res) {
    try {
        const reports = await interviewReportModel.find().populate('user', 'username email').sort({ createdAt: -1 });
        res.status(200).json({
            message: "All interview reports fetched successfully",
            reports
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching reports", error: err.message });
    }
}

/**
 * @name deleteUser
 * @description Delete a user and their reports (Admin only)
 */
async function deleteUser(req, res) {
    const { userId } = req.params;
    try {
        await userModel.findByIdAndDelete(userId);
        await interviewReportModel.deleteMany({ user: userId });
        res.status(200).json({ message: "User and their reports deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting user", error: err.message });
    }
}

module.exports = {
    getAllUsers,
    getAllReports,
    deleteUser
};
