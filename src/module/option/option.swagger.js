/**
 * @swagger
 * tags:
 *   - name: Option
 *     description: Option Module and Route
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateOption:
 *       type: object
 *       required:
 *         - title
 *         - key
 *         - category
 *       properties:
 *         title:
 *           type: string
 *           description: عنوان قابل نمایش Option
 *           example: حافظه داخلی
 *
 *         key:
 *           type: string
 *           description: کلید یکتای Option برای استفاده در برنامه
 *           example: storage
 *
 *         type:
 *           type: string
 *           enum:
 *             - number
 *             - string
 *             - array
 *             - boolean
 *           description: نوع مقدار Option
 *           example: number
 *
 *         enum:
 *           type: array
 *           items:
 *             type: string
 *           description: مقادیر مجاز برای Option در صورت محدود بودن انتخاب‌ها
 *           example:
 *             - 128
 *             - 256
 *             - 512
 *
 *         guid:
 *           type: string
 *           description: شناسه اختصاصی Option
 *           example: 7f8a9c12
 *
 *         required:
 *           type: boolean
 *           description: آیا وارد کردن این Option هنگام ثبت آگهی اجباری است؟
 *           default: false
 *           example: true
 *
 *         category:
 *           type: string
 *           description: شناسه دسته‌بندی مربوط به Option
 *           example: 68b123456789abcdef123456
 */

/**
 * @swagger
 * /options:
 *   post:
 *     summary: create new option for category
 *     tags:
 *       - Option
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOption'
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/CreateOption'
 *     responses:
 *       201:
 *         description: Option با موفقیت ایجاد شد
 *       400:
 *         description: درخواست نامعتبر
 *
 *   get:
 *     summary: get all options of category
 *     tags:
 *       - Option
 *     responses:
 *       200:
 *         description: Option ها با موفقیت دریافت شدند
 *
 * /options/{id}:
 *   get:
 *     summary: دریافت یک Option بر اساس شناسه
 *     tags:
 *       - Option
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: شناسه Option
 *         example: 6abfd6621d7a87eb5f3e872d
 *     responses:
 *       200:
 *         description: Option با موفقیت دریافت شد
 *       404:
 *         description: Option پیدا نشد
 *
 * /options/category/{categoryId}:
 *   get:
 *     summary: دریافت Option های یک Category
 *     tags:
 *       - Option
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: شناسه Category
 *         example: 6a944f41d8e71639ac2cfb15
 *     responses:
 *       200:
 *         description: Option های Category با موفقیت دریافت شدند
 *       404:
 *         description: Category پیدا نشد
 * @swagger
 * /options/by-category-slug/{slug}:
 *  get:
 *      summary: get all options of category
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path        
 *              name: slug
 *              type: string
 *      responses:
 *          200: 
 *              description: successfully
 */