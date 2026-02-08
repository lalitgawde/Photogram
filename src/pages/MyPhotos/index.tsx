import React from "react";
import { getPostByUserId } from "@/repository.ts";
import type { DocumentResponse, Post } from "@/types";
import { HeartIcon } from "lucide-react";
import UserAuthContext from "@/store/UserAuthContext";
import Loader from "@/components/Loader";
import { useNavigate } from "react-router";

// interface IMyPhotosProps {}

const MyPhotos = () => {
  const navigate = useNavigate();
  const { user } = React.useContext(UserAuthContext);
  const [data, setData] = React.useState<DocumentResponse[]>([]);
  const [loading, setLoading] = React.useState(true);

  const getAllPost = async (id: string) => {
    try {
      const posts = await getPostByUserId(id);
      const tempArr: DocumentResponse[] = [];
      if (posts.size > 0) {
        posts.forEach((doc) => {
          const data = doc.data() as Post;
          const responseObj: DocumentResponse = {
            id: doc.id,
            ...data,
          };
          console.log("The response object is : ", responseObj);
          tempArr.push(responseObj);
        });
        setData(tempArr);
      } else {
        console.log("No such document");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  React.useEffect(() => {
    if (user != null) {
      getAllPost(user.uid);
    }
  }, [user]);

  return (
    <div className="flex justify-center">
      <div className="border max-w-4xl w-full">
        <h3 className="bg-slate-800 text-white text-center text-lg p-2">
          My Photos
        </h3>
        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {loading && <Loader />}
            {!loading && data.length > 0
              ? data.map((item) => {
                  return (
                    <div key={item.photos[0].uuid} className="relative">
                      <div className="absolute group transition-all duration-200 bg-transparent hover:bg-slate-950 hover:bg-opacity-75 top-0 bottom-0 left-0 right-0 w-full h-full">
                        <div className="flex flex-col justify-center items-center w-full h-full">
                          <HeartIcon className="hidden group-hover:block fill-white" />
                          <div className="hidden group-hover:block text-white">
                            {item.likes} likes
                          </div>
                        </div>
                      </div>
                      <img
                        src={`${item.photos[0].cdnUrl}/-/progressive/yes/-/scale_crop/300x300/center/`}
                      />
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
      {!loading && data.length === 0 && (
        <div className="text-center py-8 text-slate-500">No photos to show</div>
      )}
    </div>
  );
};

export default MyPhotos;
