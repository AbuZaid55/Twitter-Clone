/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
          },
          {
              protocol: 'https',
              hostname: 'img.freepik.com',
          },
          {
              protocol: 'https',
              hostname: 'abzaid55-twitter-clone.s3.ap-south-1.amazonaws.com',
          },
      ],
  },
};

export default nextConfig;
