/**
 * @swagger
 * tags:
 *   - name: Category
 *     description: Category Module and Route
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCategory:
 *       type: object
 *       required:
 *         - name
 *         - icon
 *       properties:
 *         name:
 *           type: string
 *           description: نام دسته‌بندی
 *           example: املاک
 *         slug:
 *           type: string
 *           : اسلاگ یکتا (اختیاری یا اجباری بر اساس لاجیک شما)
 *           example: real-estate
 *         icon:
 *           type: string
 *           description: نام یا آیکون دسته‌بندی
 *           example: real-estate.png
 *         parent:
 *           type: string
 *           description: شناسه والد (در صورت وجود)
 */


/**
 * @swagger
 * /category:
 *   post:
 *     summary: create new category
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       201:
 *         description: created successfully
 *       400:
 *         description: bad request
 *
 *   get:
 *     summary: get all categories
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: success
 */
