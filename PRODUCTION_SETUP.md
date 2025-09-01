# Production Setup Guide

## Sanity Studio Authentication for Production

When you deploy your blog to production, the Sanity Studio at `/studio` will require proper authentication. Here's how to set it up:

### 1. Configure Authentication in Sanity Management Console

1. Go to [Sanity Management Console](https://www.sanity.io/manage)
2. Select your project (`jz5d0jhu`)
3. Navigate to **Settings** → **Authentication**
4. Add your production domain(s) to the **Allowed Origins** list:
   - `https://yourdomain.com`
   - `https://www.yourdomain.com`

### 2. Set Up User Access

1. In the Sanity Management Console, go to **Members**
2. Invite team members who should have access to create/edit content
3. Assign appropriate roles:
   - **Administrator**: Full access to everything
   - **Editor**: Can create and edit content
   - **Viewer**: Read-only access

### 3. Environment Variables for Production

Ensure these environment variables are set in your production environment:

```bash
SANITY_PROJECT_ID=jz5d0jhu
SANITY_DATASET=myblogs
SANITY_API_VERSION=2024-01-01
```

### 4. CORS Configuration

In your Sanity project settings:
1. Go to **Settings** → **API**
2. Add your production domain to **CORS Origins**:
   - `https://yourdomain.com`
   - `https://www.yourdomain.com`

### 5. Authentication Flow

When users visit `/studio` on your live site:
1. They'll see a login screen
2. They can sign in with:
   - Google account
   - GitHub account
   - Email/password (if configured)
3. Only users you've invited will have access

### 6. Security Best Practices

- **Never commit API tokens** to your repository
- Use **read-only tokens** for public-facing parts of your site
- Use **write tokens** only in secure server environments
- Regularly review and rotate API tokens
- Monitor access logs in the Sanity console

### 7. Content Publishing Workflow

1. Authors log in to `/studio`
2. Create/edit blog posts using the rich text editor
3. Set publish dates and tags
4. Click "Publish" to make content live
5. Content appears immediately on your blog

### 8. Backup and Version Control

Sanity automatically:
- Backs up all your content
- Maintains version history
- Allows content rollback if needed

## Deployment Checklist

- [ ] Set up authentication in Sanity console
- [ ] Configure CORS for your domain
- [ ] Add production environment variables
- [ ] Invite team members
- [ ] Test login flow on staging
- [ ] Verify content publishing works
- [ ] Set up monitoring and alerts

## Support

For issues with Sanity Studio authentication:
- Check the [Sanity Documentation](https://www.sanity.io/docs)
- Contact Sanity Support through their console
- Review authentication logs in the Sanity Management Console