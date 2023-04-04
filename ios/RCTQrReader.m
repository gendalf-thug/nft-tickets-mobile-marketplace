//
//  RCTQrReader.m
//  NftTicketsMobileMarketplace
//
//  Created by Вадим Прасолов on 04.04.2023.
//

#import "RCTQrReader.h"
#import <AVFoundation/AVFoundation.h>
#import <CoreImage/CoreImage.h>

@implementation RCTQrReader
RCT_EXPORT_MODULE(QrReader);

RCT_EXPORT_METHOD(readerQR:(NSString *)fileUrl success:(RCTPromiseResolveBlock)success failure:(RCTResponseErrorBlock)failure){
  dispatch_sync(dispatch_get_main_queue(), ^{
    NSArray *result = [self readerQR:fileUrl];
    if(result){
      success(result);
    }else{
      NSString *domain = @"";
      NSString *desc = NSLocalizedString(@"No related QR code", @"");
      NSDictionary *userInfo = @{ NSLocalizedDescriptionKey : desc };
      NSError *error = [NSError errorWithDomain:domain
                                           code:404
                                       userInfo:userInfo];
      failure(error);
    }
  });
  
  
  
}

-(NSArray*)readerQR:(NSString*)fileUrl{
  fileUrl = [fileUrl stringByReplacingOccurrencesOfString:@"file://" withString:@""];
  
  CIContext *context = [CIContext contextWithOptions:nil];
  
  // CIDetector(CIDetector(Can be used for face recognition) for image analysis，Declare a CIDetector，And set the recognition type CIDetectorTypeQRCode
  CIDetector *detector = [CIDetector detectorOfType:CIDetectorTypeQRCode context:context options:@{CIDetectorAccuracy:CIDetectorAccuracyHigh}];
  NSData *fileData = [[NSData alloc] initWithContentsOfFile:fileUrl];
  CIImage *ciImage = [CIImage imageWithData:fileData];
  NSArray *features = [detector featuresInImage:ciImage];
  if(!features || features.count==0){
    return nil;
  }
  NSMutableArray *messageStrings = [NSMutableArray array];
  for (CIQRCodeFeature *feature in features) {
      [messageStrings addObject:feature.messageString];
  }
  return messageStrings;
}

@end
