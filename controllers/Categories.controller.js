
import response from "../const/response"
import Categories from "../models/Categories";



export const ShowAllCategories = async (req, res) => {
  try {
    const ShowAllCategorie = await Categories.findAll();
    console.log("data", ShowAllCategorie);

    res.status(200).json({
      data: {
        ShowAllCategorie,
      },
      message: 'Added successfully',
    });
  } catch (error) {
    console.error('Insertion error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


export const AddCategories = async (req, res) => {
  try {
    const { CategorieName } = req.body;

    const AddCategorie = await Categories.create({
      CategorieName
    });

    res.status(200).json({
      AddCategorie,
      message: 'Added successfully'
    });
  } catch (error) {
    console.error('Insertion error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


// Controller function to disable a category
export const OffCategories = async (req, res) => {
  try {
    const { id } = req.body;
    const disableCategorie = await Categories.update({ status: false }, { where: { id } });
    res.status(200).json({
      disableCategorie,
      message: 'Status updated successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Controller function to enable a category
export const OnCategories = async (req, res) => {
  try {
    const { id } = req.body;
    const enableCategorie = await Categories.update({ status: true }, { where: { id } });
    res.status(200).json({
      enableCategorie,
      message: 'Status updated successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Controller function to delete a category
export const DeleteCategories = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(req.body)
    const deleteCategorie = await Categories.destroy({ where: { id } });
    res.status(200).json({
      deleteCategorie,
      message: 'Deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};


export const getCountCategories = async (req, res) => {
  try {
    const CountCategories = await Categories.count( );
   

    res.status(200).json({
      CountCategories
      
    });
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};