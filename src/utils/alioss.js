import OSS from "ali-oss";

export const oss = new OSS({
  region: "oss-cn-beijing",
  accessKeyId: "LTAI5t5Y43b3QKmLtx7kPp3c",
  accessKeySecret: "n7K8rOFmvmdBxGQDVXbvl9uVAVb10t",
  bucket: "edu-mall-csu",
});

export const uploadFile = async (file, fileName) => {
  try {
    const res = await oss.put(`gameMall/${fileName || file.name}`, file);
    return res;
  } catch (e) {
    throw e;
  }
};
