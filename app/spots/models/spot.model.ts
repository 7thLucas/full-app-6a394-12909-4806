import { prop, getModelForClass, modelOptions, Severity } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class OperatingHours {
  @prop({ type: String, required: false })
  monday?: string;

  @prop({ type: String, required: false })
  tuesday?: string;

  @prop({ type: String, required: false })
  wednesday?: string;

  @prop({ type: String, required: false })
  thursday?: string;

  @prop({ type: String, required: false })
  friday?: string;

  @prop({ type: String, required: false })
  saturday?: string;

  @prop({ type: String, required: false })
  sunday?: string;
}

export class SpotTip {
  @prop({ type: String, required: true })
  text!: string;

  @prop({ type: String, required: false })
  author?: string;

  @prop({ type: Date, default: () => new Date() })
  createdAt?: Date;
}

@modelOptions({
  schemaOptions: {
    collection: "tbl_spots",
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
  options: { allowMixed: Severity.ALLOW },
})
export class Spot extends TimeStamps {
  @prop({ type: String, required: true })
  name!: string;

  @prop({
    type: String,
    required: true,
    enum: ["restaurants", "lodging", "safari", "historical", "braai", "other"],
  })
  category!: string;

  @prop({ type: String, required: false })
  description?: string;

  @prop({ type: String, required: false })
  address?: string;

  @prop({ type: String, required: false })
  region?: string;

  @prop({ type: Number, required: false })
  lat?: number;

  @prop({ type: Number, required: false })
  lng?: number;

  @prop({ type: String, required: false })
  phoneNumber?: string;

  @prop({ type: String, required: false })
  whatsappNumber?: string;

  @prop({ type: String, required: false })
  priceRange?: string; // e.g. "$", "$$", "$$$"

  @prop({ type: [String], required: false, default: [] })
  photos?: string[];

  @prop({ type: Boolean, required: false, default: false })
  hasFreeWifi?: boolean;

  @prop({ type: Boolean, required: false, default: false })
  hasParking?: boolean;

  @prop({ type: Boolean, required: false, default: false })
  acceptsEcocash?: boolean;

  @prop({ type: OperatingHours, required: false })
  operatingHours?: OperatingHours;

  @prop({ type: () => [SpotTip], required: false, default: [] })
  tips?: SpotTip[];

  @prop({ type: Boolean, required: false, default: true })
  isActive?: boolean;

  @prop({ type: Boolean, required: false, default: false })
  isFeatured?: boolean;

  @prop({ type: Number, required: false, default: 0 })
  viewCount?: number;

  @prop({ type: String, required: false })
  submittedBy?: string;
}

export const SpotModel = getModelForClass(Spot);
