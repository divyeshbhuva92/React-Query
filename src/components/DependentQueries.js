import axios from "axios";
import { useQuery } from "react-query";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};
const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export default function DependentQueries({ email }) {
  const { data: user } = useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUserByEmail(email),
  });

  const channelId = user && user.data.channelId;

  const { data: courses } = useQuery(
    ["courses", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  );

  let courseList = [];
  if (courses) {
    courseList = courses.data.courses;
  }

  return (
    <div>
      <h4>DependentQueries</h4>
      <br />
      {courses ? <h5>{courses.data.id}</h5> : null}

      {courseList.map((course) => {
        return <div key={course}>{course}</div>;
      })}
    </div>
  );
}
