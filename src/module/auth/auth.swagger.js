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
 * components:
 *   schemas:
 *     CheckOTP:
 *       type: object
 *       required:
 *         - mobile
 *         - code
 *       properties:
 *         mobile:
 *           type: string
 *           example: "09121212333"
 *         code:
 *           type: string
 *           example: "32154"
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
/**
 * @swagger
 * /auth/check-otp:
 *   post:
 *     summary: Check OTP
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CheckOTP"
 *     responses:
 *       200:
 *         description: Mobile verified successfully
 *       401:
 *         description: Invalid or expired OTP
 *       404:
 *         description: User not found
 */


