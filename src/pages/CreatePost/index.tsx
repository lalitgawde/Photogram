import React, { useContext } from "react";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UserAuthContext from "@/store/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { type OutputFileEntry } from "@uploadcare/file-uploader";
import type { PhotoMeta, Post } from "@/types";
import { createPost } from "@/repository";

export interface FileEntry {
  files: OutputFileEntry[];
}

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserAuthContext);
  const [fileEntry, setFileEntry] = React.useState<FileEntry>({
    files: [],
  });
  const [post, setPost] = React.useState<Post>({
    caption: "",
    photos: [],
    likes: 0,
    userlikes: [],
    userId: null,
    date: new Date(),
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const photoMeta: PhotoMeta[] = fileEntry.files.map((file) => {
        return { cdnUrl: file.cdnUrl, uuid: file.uuid };
      });
      if (user != null) {
        const newPost: Post = {
          ...post,
          userId: user?.uid || null,
          photos: photoMeta,
        };
        console.log("The final posy is  : ", newPost);
        const postId = await createPost(newPost);
        console.log("Created post with ID: ", postId);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error creating post: ", error);
      navigate("/error");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border w-[70%] sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
        <h3 className="bg-slate-800 text-white text-center text-lg p-2">
          Create Post
        </h3>
      </div>
      <div className="py-8 w-[70%] sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
        <form onSubmit={handleSubmit} className="max-w-3xl">
          <div className="flex flex-col">
            <Label className="mb-4" htmlFor="caption">
              Photo Caption
            </Label>
            <Textarea
              className="mb-8"
              id="caption"
              placeholder="what's in your photo!"
              value={post.caption}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPost({ ...post, caption: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <Label className="mb-4" htmlFor="photo">
              Photos
            </Label>
            <FileUploader fileEntry={fileEntry} onChange={setFileEntry} />
          </div>
          <Button className="mt-8 w-32 cursor-pointer" type="submit">
            Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
