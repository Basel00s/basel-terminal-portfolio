import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
async function bootstrap(){const app=await NestFactory.create(AppModule);const origins=(process.env.FRONTEND_ORIGIN??"http://localhost:3000").split(",").map(x=>x.trim());app.enableCors({origin:origins,methods:["GET","POST","OPTIONS"],allowedHeaders:["Content-Type","Accept"]});app.useGlobalPipes(new ValidationPipe({whitelist:true,forbidNonWhitelisted:true,transform:true}));const port=Number(process.env.PORT??4000);await app.listen(port);console.log("Contact API running on port "+port);}
void bootstrap();