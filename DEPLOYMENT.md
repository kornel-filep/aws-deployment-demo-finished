# AWS Deployment Guide

This guide explains how to deploy the Gemini Chat application to AWS using AWS CDK.

## Architecture

The application is deployed using:
- **S3**: Static file hosting
- **CloudFront**: Global CDN for fast content delivery and HTTPS
- **Origin Access Identity**: Secure access from CloudFront to S3

## Prerequisites

1. **AWS Account** - You need an active AWS account
2. **AWS CLI** - Installed and configured with credentials
3. **Node.js** - v18 or higher
4. **AWS CDK** - Will be installed via npm

## Initial Setup

### 1. Configure AWS Credentials

```bash
aws configure
```

Enter your AWS Access Key ID, Secret Access Key, and default region.

### 2. Install Dependencies

Install dependencies for both the app and CDK:

```bash
# Install app dependencies
npm install

# Install CDK dependencies
cd cdk
npm install
cd ..
```

### 3. Build the Application

Build the React app first (CDK needs the `dist` folder to exist):

```bash
npm run build
```

### 4. Bootstrap CDK (First Time Only)

If this is your first time using CDK in your AWS account/region:

```bash
cd cdk
npx cdk bootstrap
cd ..
```

## Deployment

### Quick Deploy

Use the provided deployment script (it builds and deploys automatically):

```bash
# Using default AWS profile
./scripts/deploy.sh

# Using a specific AWS profile
./scripts/deploy.sh --profile personal

# See all options
./scripts/deploy.sh --help
```

### Manual Deploy

Or deploy manually step by step:

```bash
# 1. Build the React application (must be done first!)
npm run build

# 2. Deploy with CDK
cd cdk
npm run deploy
```

**Important**: Always build the app before running CDK commands, as CDK needs the `dist` folder to exist.

### Review Changes Before Deploy

To see what resources will be created:

```bash
cd cdk
npm run synth
```

## Post-Deployment

After deployment completes, CDK will output:
- **WebsiteURL** - Your application URL (CloudFront domain)
- **BucketName** - S3 bucket name
- **DistributionId** - CloudFront distribution ID

Access your application at the WebsiteURL (e.g., `https://d1234567890.cloudfront.net`)

## Updating the Application

To deploy updates:

```bash
# Default profile
./scripts/deploy.sh

# With specific profile
./scripts/deploy.sh --profile personal
```

This will:
1. Build the latest version
2. Upload to S3
3. Invalidate CloudFront cache

## Monitoring and Costs

### CloudFront Monitoring
- View CloudFront metrics in AWS Console → CloudFront → Distributions
- Check access logs if needed

### Estimated Costs
- **S3**: ~$0.023/GB storage + requests
- **CloudFront**: ~$0.085/GB data transfer (first 10 TB)
- **Free tier**: 50 GB data transfer out per month (first 12 months)

Low traffic applications typically cost $1-5/month.

## Cleanup

To remove all AWS resources:

```bash
# With confirmation prompt
./scripts/destroy.sh

# With specific profile
./scripts/destroy.sh --profile personal

# Skip confirmation
./scripts/destroy.sh --force --profile personal

# See all options
./scripts/destroy.sh --help
```

Or manually:

```bash
cd cdk
npx cdk destroy --profile personal
```

**Note**: This will delete the S3 bucket and all files, and remove the CloudFront distribution.

## Troubleshooting

### Issue: CDK command not found
**Solution**: Install AWS CDK globally or use `npx cdk` instead

### Issue: Access denied errors
**Solution**: Check AWS credentials with `aws sts get-caller-identity`

### Issue: Distribution takes long to deploy
**Solution**: CloudFront distributions take 10-20 minutes to deploy globally

### Issue: 403 Forbidden on website
**Solution**: 
- Check CloudFront distribution is deployed
- Check error responses are configured correctly
- Wait a few minutes after deployment

### Issue: Cannot find asset at /path/to/dist
**Solution**: Build the React app first with `npm run build` before running any CDK commands

## Custom Domain (Optional)

To use a custom domain:

1. Purchase/configure domain in Route53
2. Request SSL certificate in ACM (must be in us-east-1)
3. Update `gemini-chat-stack.ts`:

```typescript
// Add certificate and domain configuration
certificate: acm.Certificate.fromCertificateArn(this, 'Cert', 'arn:aws:acm:...'),
domainNames: ['chat.yourdomain.com'],
```

4. Create Route53 A record pointing to CloudFront distribution

## Security Notes

- S3 bucket is private (not public)
- CloudFront uses OAI for secure S3 access
- HTTPS is enforced
- API keys are stored client-side only
- No backend required for this static site

## Support

For CDK issues, see: https://docs.aws.amazon.com/cdk/
For AWS support: https://console.aws.amazon.com/support/

