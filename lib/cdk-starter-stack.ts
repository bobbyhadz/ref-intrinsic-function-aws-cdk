import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib';

export class MyCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const s3Bucket = new s3.Bucket(this, 'avatars-bucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const cfnBucket = s3Bucket.node.defaultChild as s3.CfnBucket;

    // 👇 get the bucket ref
    const bucketRef1 = cfnBucket.ref;
    console.log('bucketRef1 👉', bucketRef1);

    // 👇 same thing but using the Fn class
    const bucketRef2 = cdk.Fn.ref(cfnBucket.logicalId);
    console.log('bucketRef2 👉', bucketRef2);

    // 👇 Output with the ref as a value
    new cdk.CfnOutput(this, 'myBucketRef', {
      value: bucketRef1,
      description: 'The name of the s3 bucket',
    });
  }
}
