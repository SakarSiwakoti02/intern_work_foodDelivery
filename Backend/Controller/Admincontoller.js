const { menus } = require("../models"); // Ensure correct model import
const fs = require('fs');

// Add Menu Item
exports.AddMenu = async (req, res) => {
    try {
        const { foodName, price, description, category } = req.body;
        let photo = null;

        if (req.file) {
            photo = process.env.IMAGE_URL + req.file.filename;
        } else {
            return res.status(400).json({ message: "Photo is required" });
        }

        if (!foodName || !price || !description || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newMenuItem = await menus.create({
            foodName,
            price,
            description,
            photo,
            category,
        });

        return res.status(201).json({ message: "Menu item added successfully", menu: newMenuItem });

    } catch (error) {
        console.error("Error adding menu item:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


exports.getMenu = async (req, res) => {
    try {
        const menuItems = await menus.findAll();
        return res.status(200).json({ menu: menuItems });
    } catch (error) {
        console.error("Error fetching menu items:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


exports.getMenuById = async (req, res) => {
    try {
        const { id } = req.params;

        const menuItem = await menus.findOne({
            where: { id },
        });

        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        return res.status(200).json({ message: "Menu item fetched successfully", menu: menuItem });
    } catch (error) {
        console.error("Error fetching menu item:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


exports.editMenuItem = async (req, res) => {
    const { id } = req.params;
    const { foodName, price, description, category } = req.body;
    let photo = null;

    try {
        const oldData = await menus.findOne({ where: { id } });
        
        if (!oldData) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        if (req.file) {
            photo = process.env.IMAGE_URL + req.file.filename;
            const image = oldData.photo;
            
            if (image) {
                const lengthOfHost = "http://localhost:3000/".length;
                const filenameInUploadFolder = image.slice(lengthOfHost);
                
                fs.unlink(`./uploads/${filenameInUploadFolder}`, (err) => {
                    if (err) {
                        console.error("Error deleting file", err);
                    } else {
                        console.log("File deleted successfully");
                    }
                });
            }
        } else {
            photo = oldData.photo;
        }

        await menus.update(
            { foodName, price, description, photo, category },
            { where: { id } }
        );

        res.status(200).json({ message: "Menu item updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.DeleteMenuById = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("Delete")

        const menuItem = await menus.findOne({ where: { id } });

        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        // Delete associated image if exists
        if (menuItem.photo) {
            const lengthOfHost = "http://localhost:5000/".length;
            const filenameInUploadFolder = menuItem.photo.slice(lengthOfHost);

            fs.unlink(`uploads/${filenameInUploadFolder}`, (err) => {
                if (err) {
                    console.error("Error deleting file", err);
                } else {
                    console.log("File deleted successfully");
                }
            });
        }

        await menuItem.destroy();

        return res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (error) {
        console.error("Error deleting menu item:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
