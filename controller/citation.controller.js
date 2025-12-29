const citationschema = require("../schema/citation.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");


const getAllcitation = async (req, res, next) => {
  try {
    const citation = await citationschema.find()
     res.status(200).json(citation);
  } catch (error) {
    next(error)
  }
};

const addcitation = async (req, res, next) => {
  try {
    const {
      citation,
      user_id,
      book_id
    } = req.body;

    await citationschema.create({
      citation,
      user_id,
      book_id 
    });
    res.status(201).json({
      message: "Added citation", 
    });
  } catch (error) {
    next(error)
  }
};

const getOnecitation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const citation = await citationschema.findById(id);

    if (!citation) {
      throw CustomErrorHandler.NotFound("citation not found")
    }

    res.status(200).json(citation);
  } catch (error) {
    next(error)
  }
};

const updatecitation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      citation,
      user_id,
      book_id 
    } = req.body;
    const Foundedcitation = await citationschema.findById(id);

    if (!Foundedcitation) {
      throw CustomErrorHandler.NotFound("citation not found")
    }

    await citationschema.findByIdAndUpdate(id, {
      citation,
      user_id,
      book_id 
    });

    res.status(201).json({
        message: "citation updated"
    })
  } catch (error) {
    next(error)
  }
};
const deletecitation = async (req, res, next) => {
    try {
        const {id} = req.params
        const citation = await citationschema.findById(id)
        
        if (!citation) {
      throw CustomErrorHandler.NotFound("citation not found")
        }
        await citationschema.findByIdAndDelete(id)

        res.status(200).json({
            message: "citation deleted"
        })

    } catch (error) {
    next(error)
    }
}

module.exports = {
  getAllcitation,
  getOnecitation,
  addcitation,
  updatecitation,
  deletecitation
};