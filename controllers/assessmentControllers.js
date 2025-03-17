import Assessment from "../modal/assessment.js";
import User from "../modal/UserModal.js";

const createAssessment = async (req, res) => {
    const { userId, total_questions, attempted, unattempted, correct } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const newAssessment = await Assessment.create({
            user_id: userId,
            total_questions,
            attempted,
            unattempted,
            correct,
        });

        res.status(201).json(newAssessment);
    } catch (error) {
        console.error("Error creating assessment:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateAssessment = async (req, res) => {
    const { id } = req.params;
    const { total_questions, attempted, unattempted, correct } = req.body;

    try {
        const assessment = await Assessment.findByPk(id);
        if (!assessment) return res.status(404).json({ message: "Assessment not found" });

        const updatedAssessment = await assessment.update({
            total_questions,
            attempted,
            unattempted,
            correct,
        });

        res.status(200).json(updatedAssessment);
    } catch (error) {
        console.error("Error updating assessment:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const publishAssessment = async (req, res) => {
    const { id } = req.params;

    try {
        const assessment = await Assessment.findOne({ where: { user_id: id } });
        if (!assessment) return res.status(404).json({ message: "Assessment not found" });

        const publishedAssessment = await assessment.update({
            published: true,
        });

        res.status(200).json({ message: "Assessment published", publishedAssessment });
    } catch (error) {
        console.error("Error publishing assessment:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const getAllAssessments = async (req, res) => {
    try {
        const assessments = await Assessment.findAll({
            include: {
                model: User,
                attributes: ['name', 'email']
            }
        });
        res.status(200).json(assessments);
    } catch (error) {
        console.error("Error fetching assessments:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const getPublishAssessmentUser = async (req, res) => {
    const { id } = req.params;

    try {
        const assessment = await Assessment.findOne({
            where: { user_id: id, published: true },
            include: [
                {
                    model: User,
                    attributes: ['name', 'email'],
                },
            ],
        });

        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found" });
        }

        res.status(200).json(assessment);
    } catch (error) {
        console.error("Error fetching published report:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export { createAssessment, updateAssessment, publishAssessment, getAllAssessments, getPublishAssessmentUser };
