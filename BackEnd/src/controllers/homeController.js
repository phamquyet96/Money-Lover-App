import db from "../models/index"

let getHomePage = async (req, res) => {
    try {//tìm tất cả dữ liệu trong bảng user
        let data = await db.User.findAll();
        return res.render("homepage.ejs", { data: JSON.stringify(data) });
    } catch (error) {
        console.log(error)
    }
}

let getAboutPage = (req, res) => {
    return res.render("test/aboutpage.ejs")
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
}