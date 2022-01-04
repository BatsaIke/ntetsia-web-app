import { useToast } from "@chakra-ui/react";
import Axios from "axios";
import React from "react";
import api from "utils/auth/api";



const getToken=async()=>{
    const token = await localStorage.getItem("token-ds");
    return token;
}


const ApiContext = React.createContext({});

export const ApiProvider = ({ children }) => {
  const toast = useToast();

  const countriesList = async () => {
    return await Axios.get("https://restcountries.eu/rest/v2/all");
  };
  
  

  const postFeed = async (payload) => {
    try {
      await api.post("/posts", payload);
    } catch (error) {
      toast({
        title: "Error occured.",
        description: error.response.data.errors.body[0],
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const momoToken = async () => {
    try {
      const { data } = await api.get('https://test.theteller.net/checkout/checkout/T1YySjIvUUd5UTJINFZEL0tFcXdPUT09OlpqSTBPVFJsWVRWa1kyTmhZMlEyWkRVNE9XWmpOVGsxTWpoa01UWmxaRFk9');
      return data.data;
    } catch (error) {
      console.log(error.response.data.message);
      
    }
     };

  
 

  const getProfile = async (id) => {
    const t = await getToken();
    try {
      const { data } = await api.get(`/members/${id}/profile`,{headers:{
        'Authorization': `Bearer ${t}`
      }});
      return data.data;
    } catch (error) {
      console.log(error.response.data.message);
      
    }
     };

  const patchUserProfile = async (payload) => {
    try {
      const { data } = await api.patch("/members/profile/update", payload);
      console.log(data.data)
      return data.data;
      
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getUserSchools = async (id) => {
    try {
      const { data } = await api.get(`/members/${id}/schools`);
      return data.data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getUserWorks = async (id) => {
    try {
      const { data } = await api.get(`/members/${id}/work-experiences`);
      return data.data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getPeople = async () => {
    try {
      const { data } = await api.get(`/members/people`);
      return data.data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const profilePicture = async (payload) => {
    try {
      const res = await api.post("/members/upload/profile-image", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const backgroundImage = async (payload) => {
    try {
      const res = await api.post("/members/upload/background-image", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const postImageUpload = async (payload) => {
    try {
      const res = await api.post("/docs/upload", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const follow = async (payload) => {
    try {
      const res = await api.post("/members/follow", payload);
      return res;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const unfollow = async (payload) => {
    try {
      const res = await api.post("/members/unfollow", payload);
      return res;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const following = async (id) => {
    try {
      const { data } = await api.get(`/members/${id}/following`);
      return data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const followers = async (id) => {
    try {
      const { data } = await api.get(`/members/${id}/followers`);
      return data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const fetchFeeds = async () => {
    try {
      const { data } = await api.get("/feeds");
      // console.log("data", data);
      return data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const fetchPaginatedFeeds = async ({ pageParam = 1 }) => {
    try {
      const { data } = await api.get(`/feeds?page=${pageParam}`);
      // console.log("page", data);
      return data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const postLike = async (id) => {
    try {
      const res = await api.post("/posts/like", id);
      return res;
    } catch (error) {
      console.log(error.response);
    }
  };

  const postUnlike = async (id) => {
    try {
      const res = await api.post("/posts/unlike", id);
      return res;
    } catch (error) {
      console.log(error.response);
    }
  };

  const updatePost = async (id, payload) => {
    try {
      await api.patch(`/posts/${id}`, payload);
    } catch (error) {
      console.log(error.response);
    }
  };

  const deletePost = async (id) => {
    try {
      const res = await api.delete(`posts/${id}`);
      return res;
    } catch (error) {
      console.log(error.response);
    }
  };

  const getReplies = async (id) => {
    try {
      const { data } = await api.get(`/comments/${id}/replies`);
      return data;
    } catch (error) {
      console.log(error.response);
    }
  };

  const commentReply = async (id, payload) => {
    try {
      const { data } = await api.post(`/comments/${id}/reply`, payload);
      return data;
    } catch (error) {
      console.log(error.response);
    }
  };

  const getComment = async (id) => {
    try {
      const res = await api.get(`/posts/${id}/comments`);
      return res;
    } catch (error) {
      console.log(error.response);
    }
  };

  const createComment = async (id, payload) => {
    try {
      await api.post(`/posts/${id}/comments`, payload);
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteComment = async (id) => {
    try {
      const res = await api.delete(`comments/${id}`);
      return res;
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateComment = async (id, payload) => {
    try {
      await api.patch(`/comments/${id}`, payload);
    } catch (error) {
      console.log(error.response);
    }
  };

  //Schools
  const createSchool = async (payload) => {
    try {
      const res = await api.post("/schools", payload);
      if (res.status === 201) {
        toast({
          description: res.data.message,
          status: "success",
          duration: 3000,
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateSchoolExperiences = async (id, payload) => {
    try {
      const res = await api.patch(`/schools/${id}`, payload);
      if (res.status === 200) {
        toast({
          description: res.data.message,
          status: "success",
          duration: 3000,
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteSchoolExperiences = async (id) => {
    const t = await getToken();
    try {
      const res = await api.delete(`/schools/${id}`,{headers:{
        'Authorization': `Bearer ${t}`
      }});
      if (res.status === 200) {
        toast({
          description: res.data.message,
          status: "success",
          duration: 3000,
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  //Work Experiences
  const createWorkExperiences = async (payload) => {
    const t = await getToken();
    try {
      const res = await api.post("/work-experiences", payload,{headers:{
        'Authorization': `Bearer ${t}`
      }});
      if (res.status === 200) {
        toast({
          description: res.data.message,
          status: "success",
          duration: 3000,
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateWorkExperiences = async (id, payload) => {
    const t = await getToken();
    try {
      const res = await api.patch(`/work-experiences/${id}`, payload,{headers:{
        'Authorization': `Bearer ${t}`
      }});
      if (res.status === 200) {
        toast({
          description: res.data.message,
          status: "success",
          duration: 3000,
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteWorkExperiences = async (id) => {
    const t = await getToken();
    try {
      const res = await api.delete(`/work-experiences/${id}`,{headers:{
        'Authorization': `Bearer ${t}`
      }});
      if (res.status === 200) {
        toast({
          description: res.data.message,
          status: "success",
          duration: 3000,
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  //Notifications
  const getNotifications = async () => {
    const t = await getToken();
    try {
      const { data } = await api.get("/notifications",{headers:{
        'Authorization': `Bearer ${t}`
      }});
      return data;
    } catch (error) {
      console.log(error.response);
    }
  };

  const getAccountType = async () => {
    const t = await getToken();
    try {
      const { data } = await api.get(`data/account-types`,{headers:{
        'Authorization': `Bearer ${t}`
      }});
      return data.data;
    } catch (error) {
      console.log(error.response.data.message);
      
    }
     };

     const getAvailableBanks = async () => {
      const t = await getToken();
      try {
        const { data } = await api.get(`data/available-banks`,{headers:{
          'Authorization': `Bearer ${t}`
        }});
        return data.data;
      } catch (error) {
        console.log(error.response.data.message);
        
      }
       };

     const createAccoutType = async (payload) => {
      const t = await getToken();
      try {
        const { data } = await api.post(`onboarding/accounts/create`,payload, {headers:{
              'Authorization': `Bearer ${t}`
            }});
        return data.data;
      } catch (error) {
        console.log(error.response.data.message);
        
      }
       };
       
     
       const riskQuestions = async () => {
        const t = await getToken();
        try {
          const { data } = await api.get(`/data/risk-questions`,{headers:{
            'Authorization': `Bearer ${t}`
          }});
          return data.data;
        } catch (error) {
          console.log(error.response.data.message);
          
        }
         };

         const smsVerification = async () => {
           const t = await getToken();
          try {
            const { data } = await api.get(`/onboarding/phone/send-verification-sms`,{headers:{
              'Authorization': `Bearer ${t}`
            }});
            return data.data;
          } catch (error) {
            console.log(error.response.data.message);
            
          }
           };

           const getInvoice = async () => {
            const t = await getToken();
           try {
             const { data } = await api.get(`/onboarding/accounts/payment-invoice`,{headers:{
               'Authorization': `Bearer ${t}`
             }});
             return data.data;
           } catch (error) {
             console.log(error.response.data.message);
             
           }
            };

           const sendVerification = async (payload) => {
            const t = await getToken();
            try {
              const { data } = await api.post(`/onboarding/phone/verify`,payload, {headers:{
                'Authorization': `Bearer ${t}`
              }});
              return data.data;
            } catch (error) {
              console.log(error.response.data.message);
              
            }
             };

         const ckecKReferal = async (payload) => {
          const t = await getToken();
          try {
            const { data } = await api.post(`/onboarding/lookup-referrer`,payload,{headers:{
              'Authorization': `Bearer ${t}`
            }});
            return data.data;
          } catch (error) {
            console.log(error.response.data.message);
            
          }
           };

           const makePayment = async (payload) => {
            const t = await getToken();
            try {
              const { data } = await api.post(`/payments/make-payment`,payload, {headers:{
                'Authorization': `Bearer ${t}`
              }});
              return data.data;
            } catch (error) {
              console.log(error.response.data.message);
              
            }
             };

             const momoOtpVerify = async (payload) => {
              const t = await getToken();
                const { data } = await api.post(`/payments/verify-momo-otp`,payload, {headers:{
                  'Authorization': `Bearer ${t}`
                }});
                return data;
               };

               const verifyMomoPayment = async (payload) => {
                const t = await getToken();
                  const { data } = await api.post(`payments/verify-payment`,payload, {headers:{
                    'Authorization': `Bearer ${t}`
                  }});
                  return data;
                 };

            //  async function verifyMomoPayment( retries, callback, payload) {
            //     const t = await getToken();
            //     const { data } = await api.post(`payments/verify-payment`,payload, {headers:{
            //       'Authorization': `Bearer ${t}`
            //     }}).then(response => {
            //         // request successful
            
            //         if(response.data['done'] == 1) {
            //             // server done, deliver data to script to consume
            //             callback(response);
            //         }
            //         else {
            //             // server not done yet
            //             // retry, if any retries left
            //             if (retries > 0) {
            //                  Request (--retries, callback);
            //             }
            //             else {
            //                 // no retries left, calling callback with error
            //                 callback([], "out of retries");
            //             }
            //         }
            //     }).catch(error => {
            //         // ajax error occurred
            //         // would be better to not retry on 404, 500 and other unrecoverable HTTP errors
            //         // retry, if any retries left
            //         if (retries > 0) {
            //             Request(--retries, callback);
            //         }
            //         else {
            //             // no retries left, calling callback with error
            //             callback([], error);
            //         }
            //     });
            // }


               const paywithMomo = async (payload) => {
                const t = await getToken();
                  const { data } = await api.post(`payments/make-momo-payment`,payload, {headers:{
                    'Authorization': `Bearer ${t}`
                  }});
                  return data;
                 };

                 const getEmailVirificaton = async () => {
                  const t = await getToken();
                   const { data } = await api.get(`/onboarding/email/send-verification-email`,{headers:{
                     'Authorization': `Bearer ${t}`
                   }});
                   return data;
                  };

                  const verifyEmail = async (payload) => {
                    const t = await getToken();
                      const { data } = await api.post(`onboarding/email/verify`,payload, {headers:{
                        'Authorization': `Bearer ${t}`
                      }});
                      return data;
                     };

  return (
    <ApiContext.Provider
      value={{
        countriesList,
        getProfile,
        getUserSchools,
        getUserWorks,
        getPeople,
        patchUserProfile,
        profilePicture,
        backgroundImage,
        postImageUpload,
        follow,
        unfollow,
        following,
        followers,
        postFeed,
        fetchFeeds,
        fetchPaginatedFeeds,
        postLike,
        postUnlike,
        updatePost,
        deletePost,
        getReplies,
        commentReply,
        getComment,
        createComment,
        deleteComment,
        updateComment,
        createSchool,
        updateSchoolExperiences,
        deleteSchoolExperiences,
        createWorkExperiences,
        updateWorkExperiences,
        deleteWorkExperiences,
        getNotifications,
        getAccountType,
        createAccoutType,
        riskQuestions,
        ckecKReferal,
        momoToken,
        smsVerification,
        sendVerification,
        getAvailableBanks,
        getInvoice,
        makePayment,
        momoOtpVerify,
        paywithMomo,
        verifyMomoPayment,
        getEmailVirificaton,
        verifyEmail,

      }}
    >
      
      {children}
    </ApiContext.Provider>
  );
};

export default function useAPI() {
  const context = React.useContext(ApiContext);

  return context;
}
