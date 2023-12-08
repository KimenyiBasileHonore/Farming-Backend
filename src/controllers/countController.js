import farmerModel from '../models/farmer.js';
import donationForm from '../models/donationForm.js';
import AssignedModel from '../models/assignedMaterials.js';
import Tool from '../models/tools.js';
import directorModel from '../models/director.js';
import Feedback from '../models/feedback.js'; 


const countUsers = async (req, res) => {
  try {
    const userCount = await farmerModel.countDocuments();
    res.json({ count: userCount });
  } catch (error) {
    console.error('Error counting users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const countRequested = async (req, res) => {
  try {
    const RequestedCount = await donationForm.countDocuments();
    res.json({ count: RequestedCount });
  } catch (error) {
    console.error('Error counting companies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const countResponde = async (req, res) => {
  try {
    const respondCount = await AssignedModel.countDocuments();
    res.json({ count: respondCount });
  } catch (error) {
    console.error('Error counting problem reports:', error);
    res.status(500).json({ error: 'Internal server error' }); 
  }
};

const countMateliars = async (req, res) => {
    try {
      const MateliarsCount = await Tool.countDocuments();
      res.json({ count: MateliarsCount });
    } catch (error) {
      console.error('Error counting problem reports:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  const countDirector = async (req, res) => {
    try {
      const DirectorCount = await directorModel.countDocuments();
      res.json({ count: DirectorCount });
    } catch (error) {
      console.error('Error counting problem reports:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  const countfeedback = async (req, res) => {
    try {
      const FeedbackCount = await Feedback.countDocuments();
      res.json({ count: FeedbackCount });
    } catch (error) {
      console.error('Error counting problem reports:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

export { countUsers, countRequested, countResponde, countMateliars, countDirector, countfeedback };
