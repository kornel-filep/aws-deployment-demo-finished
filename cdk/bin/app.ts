#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { GeminiChatStack } from '../lib/gemini-chat-stack';

const app = new cdk.App();

new GeminiChatStack(app, 'GeminiChatStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
  description: 'Gemini Chat Application - S3 + CloudFront deployment',
});

app.synth();

