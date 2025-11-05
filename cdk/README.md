# CDK Infrastructure

This directory contains the AWS CDK infrastructure code for deploying the Gemini Chat application.

## Structure

```
cdk/
├── bin/
│   └── app.ts              # CDK app entry point
├── lib/
│   └── gemini-chat-stack.ts # Main infrastructure stack
├── cdk.json                # CDK configuration
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript configuration
```

## Resources Created

The CDK stack creates:

1. **S3 Bucket** - Stores the static website files
   - Private bucket with no public access
   - Encrypted at rest
   - Auto-delete enabled (change for production)

2. **CloudFront Distribution** - CDN for global content delivery
   - HTTPS enforced
   - Custom error responses for SPA routing
   - Origin Access Identity for secure S3 access
   - Price class: North America & Europe

3. **S3 Deployment** - Automated deployment
   - Uploads built files from `../dist`
   - Invalidates CloudFront cache on deploy

## Quick Commands

```bash
# Install dependencies
npm install

# View what will be deployed
npm run synth

# Deploy to AWS
npm run deploy

# Destroy infrastructure
npm run destroy
```

## Customization

### Change Region
Edit `bin/app.ts`:
```typescript
region: 'eu-west-1', // Change to your preferred region
```

### Add Custom Domain
Edit `lib/gemini-chat-stack.ts` and add:
```typescript
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';

// In the distribution configuration:
certificate: acm.Certificate.fromCertificateArn(...),
domainNames: ['chat.yourdomain.com'],
```

### Change Price Class
Edit `lib/gemini-chat-stack.ts`:
```typescript
priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL, // Global
```

### Production Settings
For production, change in `lib/gemini-chat-stack.ts`:
```typescript
removalPolicy: cdk.RemovalPolicy.RETAIN,
autoDeleteObjects: false,
```

## Outputs

After deployment, CDK outputs:
- `WebsiteURL` - Your application URL
- `BucketName` - S3 bucket name
- `DistributionId` - CloudFront distribution ID
- `DistributionDomainName` - CloudFront domain

## Cost Optimization

- Uses S3 for cheap storage (~$0.023/GB)
- CloudFront price class 100 (cheapest regions)
- No Lambda or compute costs
- Free tier eligible (first 12 months)

