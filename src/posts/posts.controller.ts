import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(
    /**
     * Injecting Posts Service
     */
    private readonly postsService: PostsService,
  ) {}

  // @Get()
  // public getAllPosts() {
  //   return 'You sent a Posts get request';
  // }

  /**
   * Get posts by userId
   */
  @Get(['/','/:userId'])
  public getUserPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId)
  }
}
