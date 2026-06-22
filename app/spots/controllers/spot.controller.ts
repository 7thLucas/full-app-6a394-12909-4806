import type { Request, Response } from "express";
import { SpotModel } from "../models/spot.model";

export class SpotController {
  /** GET /api/spots — list spots with filtering */
  static async list(req: Request, res: Response) {
    try {
      const {
        category,
        region,
        search,
        limit = "20",
        skip = "0",
        featured,
      } = req.query as Record<string, string>;

      const filter: Record<string, unknown> = { isActive: true };

      if (category && category !== "all") filter.category = category;
      if (region) filter.region = region;
      if (featured === "true") filter.isFeatured = true;
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { address: { $regex: search, $options: "i" } },
        ];
      }

      const spots = await SpotModel.find(filter)
        .sort({ isFeatured: -1, viewCount: -1, createdAt: -1 })
        .skip(parseInt(skip, 10))
        .limit(parseInt(limit, 10))
        .lean();

      const total = await SpotModel.countDocuments(filter);

      return res.json({ success: true, data: spots, total });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  /** GET /api/spots/:id — get single spot */
  static async getById(req: Request, res: Response) {
    try {
      const spot = await SpotModel.findById(req.params.id).lean();
      if (!spot) return res.status(404).json({ success: false, message: "Spot not found" });

      // Increment view count
      await SpotModel.findByIdAndUpdate(req.params.id, { $inc: { viewCount: 1 } });

      return res.json({ success: true, data: spot });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  /** POST /api/spots — create new spot (crowdsourcing) */
  static async create(req: Request, res: Response) {
    try {
      const {
        name,
        category,
        description,
        address,
        region,
        lat,
        lng,
        phoneNumber,
        whatsappNumber,
        priceRange,
        photos,
        hasFreeWifi,
        hasParking,
        acceptsEcocash,
        operatingHours,
        submittedBy,
      } = req.body;

      if (!name || !category) {
        return res.status(400).json({ success: false, message: "Name and category are required" });
      }

      const spot = await SpotModel.create({
        name,
        category,
        description,
        address,
        region: region || "harare",
        lat,
        lng,
        phoneNumber,
        whatsappNumber,
        priceRange,
        photos: photos || [],
        hasFreeWifi: hasFreeWifi || false,
        hasParking: hasParking || false,
        acceptsEcocash: acceptsEcocash || false,
        operatingHours,
        submittedBy,
        isActive: true,
        isFeatured: false,
      });

      return res.status(201).json({ success: true, data: spot });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  /** POST /api/spots/:id/tips — add a crowdsourced tip */
  static async addTip(req: Request, res: Response) {
    try {
      const { text, author } = req.body;
      if (!text) return res.status(400).json({ success: false, message: "Tip text is required" });

      const spot = await SpotModel.findByIdAndUpdate(
        req.params.id,
        { $push: { tips: { text, author, createdAt: new Date() } } },
        { new: true }
      ).lean();

      if (!spot) return res.status(404).json({ success: false, message: "Spot not found" });

      return res.json({ success: true, data: spot });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  /** POST /api/spots/:id/save — toggle saved (bookmark) — stored in user session for MVP */
  static async toggleSaved(req: Request, res: Response) {
    try {
      const { spotId } = req.body;
      // For MVP without full auth requirement, return success
      return res.json({ success: true, message: "Saved status toggled", spotId });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}
