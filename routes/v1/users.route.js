const express = require('express')

const router = express.Router();

const usersController = require('../../controller/users.controller');
const { randomCallLimiter } = require('../../middleware/rendomCallLimiter');
const { viewCount } = require('../../middleware/viewCount');



router.route('/')

    /**
   * @api {get}   /user    all the user
   * @apiDescription  Get all the users
   * @apiPermission   N/A
   * 
   * @apiHeader   
   * 
   * @apiParam    {Number{1-0}}   [page=1]    List page
   * @apiParam    {Number{1-100}} [limit=10]  Users per page
   * 
   * @apiSuccess  {Object[]}  all the users
   * 
   * @apiError    (Unauthorized 401)  Unauthorized    Only authenticated users can access the data
   * @apiError    (Forbidden 403) Forbidden   Only admins can access the data 
   */

    .get(viewCount, usersController.getAllUser)


    /**
    * @api {post}   /user   save the user
    * @apiDescription  save the users to the database
    * @apiPermission   N/A
    * 
    * @apiHeader   
    * 
    * @apiBody   Carry the user fall information 
    * 
    * @apiSuccess  get success message and status code
    * 
    * @apiError    (Unauthorized 401)  Unauthorized    Only authenticated users can access the data
    * @apiError    (Forbidden 403) Forbidden   Only admins can access the data 
    */

    .post(usersController.saveAUser)



router.route('/:id')
    /**
    * @api {patch}   /user/:id   update the user
    * @apiDescription  Update the user information 
    * @apiPermission   N/A
    * 
    * @apiHeader   
    * 
    * @apiParam    {id}
    * @apiBody      Carry all the information for the updated user
    * 
    * @apiSuccess  get success message and status code
    * 
    * @apiError    (Unauthorized 401)  Unauthorized    Only authenticated users can access the data
    * @apiError    (Forbidden 403) Forbidden   Only admins can access the data 
    */

    .patch(usersController.updateUser)


    /**
      * @api {delete}   /user/:id   delete the user
      * @apiDescription  delete the user form the database
      * @apiPermission   N/A
      * 
      * @apiHeader   
      * 
      * @apiParam    {id}
      * 
      * @apiSuccess  get success message and status code
      * 
      * @apiError    (Unauthorized 401)  Unauthorized    Only authenticated users can access the data
      * @apiError    (Forbidden 403) Forbidden   Only admins can access the data 
      */

    .delete(usersController.deleteUser)



router.route('/random')
    /**
      * @api {get} /user/random  get a user
      * @apiDescription  get the random user from the user list
      * @apiPermission   N/A
      * 
      * @apiHeader   
      * 
      * 
      * @apiSuccess {{object}} get a random user information
      * 
      * @apiError    (Unauthorized 401)  Unauthorized    Only authenticated users can access the data
      * @apiError    (Forbidden 403) Forbidden   Only admins can access the data 
      */
    .get(randomCallLimiter, usersController.getRandomUser)




router.route('/update/bulk-update')

    /**
      * @api {patch}   /user/update/bulk-update   update users
      * @apiDescription  Update the multiple  user information 
      * @apiPermission   N/A
      * 
      * @apiHeader   

      * @apiBody    {[array of object]}  Carry multiple user information array
      *       * 
      * @apiSuccess  get success message and status code
      * 
      * @apiError    (Unauthorized 401)  Unauthorized    Only authenticated users can access the data
      * @apiError    (Forbidden 403) Forbidden   Only admins can access the data 
      */

    .patch(usersController.bulkUserUpdate)



module.exports = router;