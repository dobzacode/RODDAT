import prisma from "./client";
import USER_MOCK from "../mocks/USER_MOCK.json";
import COMMUNITY_MOCK from "../mocks/COMMUNITY_MOCK.json";
import POST_MOCK from "../mocks/POST_MOCK.json";
import COMMENT_MOCK from "../mocks/COMMENT_MOCK.json";
import VOTE_MOCK from "../mocks/VOTE_MOCK.json";
import { Comment, Community, Post, Vote } from "@prisma/client";

const load = async () => {
  try {
    await prisma.user.createMany({ data: USER_MOCK });
    await prisma.community.createMany({
      data: COMMUNITY_MOCK as Community[],
    });
    const usersId = await prisma.user.findMany({ select: { id: true } });
    const communitiesId = await prisma.community.findMany({
      select: { community_id: true },
    });
    const postMockWithId = POST_MOCK.map((post) => {
      return {
        ...post,
        author_id: usersId[Math.floor(Math.random() * usersId.length)].id,
        community_id:
          communitiesId[Math.floor(Math.random() * communitiesId.length)]
            .community_id,
      };
    });
    await prisma.post.createMany({ data: postMockWithId });
    const posts = await prisma.post.findMany();

    const postsId = await prisma.post.findMany({
      select: { post_id: true, author_id: true, community_id: true },
    });

    const communityUsers = await prisma.communityUser.findMany({
      where: {
        user_id: { in: posts.map((p) => p.author_id) },
        community_id: { in: posts.map((p) => p.community_id) },
      },
    });

    const createCommunityUsersPromises = posts
      .filter((post) => {
        const existingCommunityUser = communityUsers.find(
          (cu) =>
            cu.user_id === post.author_id &&
            cu.community_id === post.community_id,
        );
        return !existingCommunityUser;
      })
      .map((post) => {
        return prisma.communityUser.create({
          data: {
            user_id: post.author_id,
            community_id: post.community_id,
            role: "GUEST",
          },
        });
      });

    await Promise.all(createCommunityUsersPromises);

    const commentMockWithId = COMMENT_MOCK.map((comment) => {
      return {
        ...comment,
        author_id: usersId[Math.floor(Math.random() * usersId.length)].id,

        post_id: postsId[Math.floor(Math.random() * postsId.length)].post_id,
      };
    });

    await prisma.comment.createMany({ data: commentMockWithId });
    const commentsId = await prisma.comment.findMany({
      select: { comment_id: true, post_id: true },
    });
    const childCommentMockWithId = COMMENT_MOCK.map((comment) => {
      const commentId = Math.floor(Math.random() * commentsId.length);
      return {
        ...comment,
        author_id: usersId[Math.floor(Math.random() * usersId.length)].id,
        post_id: commentsId[commentId].post_id,
        parent_comment_id: commentsId[commentId].comment_id,
      };
    });
    await prisma.comment.createMany({ data: childCommentMockWithId });
    const allComments = await prisma.comment.findMany({
      select: { comment_id: true, post_id: true, parent_comment_id: true },
    });

    const childCommentWithParentId: Omit<
      Comment,
      "content" | "positivity" | "createdAt" | "author_id"
    >[] = [];
    allComments.map((comment) => {
      if (comment.parent_comment_id) {
        childCommentWithParentId.push(comment);
      }
    });

    if (childCommentWithParentId) {
      const littleChildCommentWithId = COMMENT_MOCK.map((comment) => {
        const commentId = Math.floor(
          Math.random() * childCommentWithParentId.length,
        );
        return {
          ...comment,
          author_id: usersId[Math.floor(Math.random() * usersId.length)].id,
          post_id: childCommentWithParentId[commentId].post_id,
          parent_comment_id: childCommentWithParentId[commentId].comment_id,
        };
      });
      await prisma.comment.createMany({ data: littleChildCommentWithId });
    }

    const finalCommentsId = await prisma.comment.findMany({
      select: { comment_id: true },
    });

    const voteWithId: any[] = [];
    VOTE_MOCK.map((vote) => {
      if (Math.random() < 0.5)
        voteWithId.push({
          ...vote,
          user_id: usersId[Math.floor(Math.random() * usersId.length)].id,
          comment_id:
            finalCommentsId[Math.floor(Math.random() * finalCommentsId.length)]
              .comment_id,
        });
      else {
        voteWithId.push({
          ...vote,
          user_id: usersId[Math.floor(Math.random() * usersId.length)].id,
          post_id: postsId[Math.floor(Math.random() * postsId.length)].post_id,
        });
      }
    });
    VOTE_MOCK.map((vote) => {
      if (Math.random() < 0.5)
        voteWithId.push({
          ...vote,
          user_id: usersId[Math.floor(Math.random() * usersId.length)].id,
          comment_id:
            finalCommentsId[Math.floor(Math.random() * finalCommentsId.length)]
              .comment_id,
        });
      else {
        voteWithId.push({
          ...vote,
          user_id: usersId[Math.floor(Math.random() * usersId.length)].id,
          post_id: postsId[Math.floor(Math.random() * postsId.length)].post_id,
        });
      }
    });
    VOTE_MOCK.map((vote) => {
      if (Math.random() < 0.5)
        voteWithId.push({
          ...vote,
          user_id: usersId[Math.floor(Math.random() * usersId.length)].id,
          comment_id:
            finalCommentsId[Math.floor(Math.random() * finalCommentsId.length)]
              .comment_id,
        });
      else {
        voteWithId.push({
          ...vote,
          user_id: usersId[Math.floor(Math.random() * usersId.length)].id,
          post_id: postsId[Math.floor(Math.random() * postsId.length)].post_id,
        });
      }
    });
    VOTE_MOCK.map((vote) => {
      if (Math.random() < 0.5)
        voteWithId.push({
          ...vote,
          user_id: usersId[Math.floor(Math.random() * usersId.length)].id,
          comment_id:
            finalCommentsId[Math.floor(Math.random() * finalCommentsId.length)]
              .comment_id,
        });
      else {
        voteWithId.push({
          ...vote,
          user_id: usersId[Math.floor(Math.random() * usersId.length)].id,
          post_id: postsId[Math.floor(Math.random() * postsId.length)].post_id,
        });
      }
    });
    VOTE_MOCK.map((vote) => {
      if (Math.random() < 0.5)
        voteWithId.push({
          ...vote,
          user_id: usersId[Math.floor(Math.random() * usersId.length)].id,
          comment_id:
            finalCommentsId[Math.floor(Math.random() * finalCommentsId.length)]
              .comment_id,
        });
      else {
        voteWithId.push({
          ...vote,
          user_id: usersId[Math.floor(Math.random() * usersId.length)].id,
          post_id: postsId[Math.floor(Math.random() * postsId.length)].post_id,
        });
      }
    });
    VOTE_MOCK.map((vote) => {
      if (Math.random() < 0.5)
        voteWithId.push({
          ...vote,
          user_id: usersId[Math.floor(Math.random() * usersId.length)].id,
          comment_id:
            finalCommentsId[Math.floor(Math.random() * finalCommentsId.length)]
              .comment_id,
        });
      else {
        voteWithId.push({
          ...vote,
          user_id: usersId[Math.floor(Math.random() * usersId.length)].id,
          post_id: postsId[Math.floor(Math.random() * postsId.length)].post_id,
        });
      }
    });
    VOTE_MOCK.map((vote) => {
      if (Math.random() < 0.5)
        voteWithId.push({
          ...vote,
          user_id: usersId[Math.floor(Math.random() * usersId.length)].id,
          comment_id:
            finalCommentsId[Math.floor(Math.random() * finalCommentsId.length)]
              .comment_id,
        });
      else {
        voteWithId.push({
          ...vote,
          user_id: usersId[Math.floor(Math.random() * usersId.length)].id,
          post_id: postsId[Math.floor(Math.random() * postsId.length)].post_id,
        });
      }
    });
    VOTE_MOCK.map((vote) => {
      if (Math.random() < 0.5)
        voteWithId.push({
          ...vote,
          user_id: usersId[Math.floor(Math.random() * usersId.length)].id,
          comment_id:
            finalCommentsId[Math.floor(Math.random() * finalCommentsId.length)]
              .comment_id,
        });
      else {
        voteWithId.push({
          ...vote,
          user_id: usersId[Math.floor(Math.random() * usersId.length)].id,
          post_id: postsId[Math.floor(Math.random() * postsId.length)].post_id,
        });
      }
    });
    await prisma.vote.createMany({ data: voteWithId });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};
load();
