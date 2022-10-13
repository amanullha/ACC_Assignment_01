
const fs = require('fs');
// const config = require("./config.json");




module.exports.getAllUser = (req, res, next) => {

    let { page, limit } = req.query;

    page = Number(page);
    limit = Number(limit);

    try {

        const data = fs.readFileSync('FakeData/users.json');

        try {

            const users = JSON.parse(data);

            const len = users.length;
            const skipData = ((page - 1) || 0) * limit;


            res.status(200).send({
                success: true,
                data: users.slice(skipData, skipData + limit)
            })

        } catch (error) {

            if (error.code === 'ENOENT') {
                res.status(404).send({
                    success: false,
                    error: "File is  not found!"
                })
            }
            else {
                res.send(error.message)
            }

        }

    } catch (error) {

        if (error.code === 'ENOENT') {
            res.status(404).send({
                success: false,
                error: "File is  not found!"
            })
        }
        else {
            res.send(error.message)
        }

    }



}

module.exports.saveAUser = (req, res, next) => {

    const newUser = req.body;

    if (!(newUser.name && newUser.gender && newUser.photoUrl && newUser.contact && newUser.address)) {
        res.status(400).send({
            success: false,
            error: 'Data missing!'
        })
        return;
    }

    try {

        const data = fs.readFileSync('FakeData/users.json');



        let users = JSON.parse(data);

        newUser.name += ' ' + (users.length + 1);
        newUser.id = users.length + 1;

        users.push(newUser);


        const addData = fs.writeFileSync('FakeData/users.json', JSON.stringify(users))

        res.status(200).send({
            success: true,
            message: 'New added successfully!'
        })






    } catch (error) {

        if (error.code === 'ENOENT') {
            res.status(404).send({
                success: false,
                error: "File is  not found!"
            })
        }
        else {
            res.send(error.message)
        }

    }

}

module.exports.updateUser = (req, res, next) => {

    const id = Number(req.params.id);
    if (!id) {
        res.status(400).send({
            success: false,
            error: "Enter valid id"
        })
        return;
    }
    const updateUser = req.body;


    try {

        const data = fs.readFileSync('FakeData/users.json');



        let users = JSON.parse(data);

        const len = users.length;

        let flag = true;

        users = users.map((user) => {

            let newUser = user;

            if (user?.id == id) {
                flag = false;
                newUser = { ...user, ...updateUser };
            }
            return newUser;
        })

        if (flag) users.push(updateUser);

        fs.writeFileSync('FakeData/users.json', JSON.stringify(users));

        res.status(200).send({
            success: true,
            message: 'Update successfully!',
        })




    } catch (error) {

        if (error.code === 'ENOENT') {
            res.status(404).send({
                success: false,
                error: "File is  not found!"
            })
        }
        else {
            res.send(error.message)
        }
    }

}

module.exports.deleteUser = (req, res, next) => {

    const id = Number(req.params.id);
    if (!id) {
        res.status(400).send({
            success: false,
            error: "Enter valid id"
        })
        return;
    }

    try {

        const data = fs.readFileSync('FakeData/users.json');

        try {

            let users = JSON.parse(data);
            const len = users.length;

            users = users.filter(item => item.id != id);

            if (len === users.length) {

                res.status(404).send({
                    success: false,
                    message: 'There is nothing to delete'
                })
            }

            fs.writeFileSync('FakeData/users.json', JSON.stringify(users));

            res.status(200).send({
                success: true,
                message: 'Delete successfully!'
            })


        } catch (error) {
            if (error.code === 'ENOENT') {
                res.status(404).send({
                    success: false,
                    error: "File is  not found!"
                })
            }
            else {
                res.send(error.message)
            }
        }

    } catch (error) {

        if (error.code === 'ENOENT') {
            res.status(404).send({
                success: false,
                error: "File is  not found!"
            })
        }
        else {
            res.send(error.message)
        }
    }
}

module.exports.getRandomUser = (req, res, next) => {



    try {

        const data = fs.readFileSync('FakeData/users.json');


        try {

            const users = JSON.parse(data);
            const len = users.length;

            const random = Math.trunc((Math.random() * len) % len);

            const user = users[random];

            res.status(200).send({
                success: true,
                message: "Got the random user",
                data: user
            })



        } catch (error) {
            if (error.code === 'ENOENT') {
                res.status(404).send({
                    success: false,
                    error: "File is  not found!"
                })
            }
            else {
                res.send(error.message)
            }
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.status(404).send({
                success: false,
                error: "File is  not found!"
            })
        }
        else {
            res.send(error.message)
        }
    }

}

module.exports.bulkUserUpdate = (req, res, next) => {

    const usersUpdateData = req.body;
    if (!usersUpdateData) {
        res.status(400).send({
            success: false,
            error: "Data are missing"
        })
        return;
    }


    try {

        const data = fs.readFileSync('FakeData/users.json');


        const users = JSON.parse(data);
        const len = users?.length;

        let updatedUsers = users?.map(user => {


            let existUser = usersUpdateData?.find(updateUser => updateUser?.id === user?.id);

            if (existUser) {

                existUser = { ...user, ...existUser } || user;

                return existUser;
            }
            else return user;

        })





        fs.writeFileSync('FakeData/users.json', JSON.stringify(updatedUsers))

        res.status(200).send({
            success: true,
            message: "Data updated successfully!"
        })





    } catch (error) {
        if (error.code === 'ENOENT') {
            res.status(404).send({
                success: false,
                error: "File is  not found!"
            })
        }
        else {
            res.send(error.message)
        }
    }


}























