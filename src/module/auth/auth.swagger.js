/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Auth Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SendOTP:
 *       type: object
 *       required:
 *         - mobile
 *       properties:
 *         mobile:
 *           type: string
 *           example: "09121212333"
 */

/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     summary: Send OTP
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/SendOTP"
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/SendOTP"
 *     responses:
 *       200:
 *         description: "success"
 */