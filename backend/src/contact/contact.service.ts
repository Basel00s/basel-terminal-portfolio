import { Injectable, Logger } from "@nestjs/common";
import { CreateContactDto } from "./dto/create-contact.dto";
@Injectable()
export class ContactService {
 private readonly logger=new Logger(ContactService.name);
 create(payload:CreateContactDto){
  // Replace this foundation with a mail provider or database before production.
  this.logger.log("Contact submission received from "+payload.name+" <"+payload.email+">");
  return {success:true,message:"Your message has been received."};
 }
}