import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AdminAuthModule } from './admin/auth/admin-auth.module';
import { AdminUserModule } from './admin/user/admin-user.module';
import { AdminAuthenticationMiddleware } from './middleware/admin-auth.middleware';
import { AuthenticationMiddleware } from './middleware/auth.middleware';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    AuthModule,
    UserModule,
    AdminAuthModule,
    AdminUserModule,
    BlogModule,
  ],
  controllers: [],
  providers: [],
})
// export class AppModule {}

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude(
        // Exclude non-auth paths
        { path: 'favicon.ico', method: RequestMethod.GET },
        { path: 'images/icons/gear.png', method: RequestMethod.GET },
        // Exclude auth paths
        { path: 'auth/(.*)', method: RequestMethod.ALL },
        // Exclude all admin paths from this middleware
        { path: 'admin/(.*)', method: RequestMethod.ALL },
      )
      .forRoutes('*');  // Applies to all routes not excluded

      consumer
        // Apply AdminAuthenticationMiddleware only to admin routes
        .apply(AdminAuthenticationMiddleware)
        .exclude(
          // Exclude all admin auth paths
          { path: 'admin/auth/(.*)', method: RequestMethod.ALL },
        )
          // only apply admin auth middleware for admin routes
        .forRoutes({ path: 'admin/*', method: RequestMethod.ALL });
  }
}
