const AcceptingForm = require('../models/rab');
const Farmer = require('../models/farmer');

class createAcceptingForm {
    static async form(req, res) {
        try {
            const { status, farmerId, date } = req.body;
            const farmer = await Farmer.findById(farmerId);

            console.log('Received form data:', {
                status,
                farmerId,
                date,
            });

            const acceptingForm = new AcceptingForm({
                status,
                farmer,
                date,
            });

            console.log('Saving the accepting form');

            const savedAcceptingForm = await acceptingForm.save();
            res.status(201).json({ message: "Accepting form created successfully", acceptingForm: savedAcceptingForm });
        } catch (error) {
            console.error('Catch block error:', error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};
export default createAcceptingForm;
