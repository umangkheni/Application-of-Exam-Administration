import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllExams } from '../redux/examSlice';

const Exam = () => {
  const dispatch = useDispatch();
  const exams = useSelector((state) => state.student.exams);
  const { isLoading } = useSelector(state => state.student);

  useEffect(() => {
    dispatch(getAllExams());
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center h-screen bg-black bg-opacity-50">
      <div className="flex flex-wrap justify-center gap-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          exams?.map((exam) => (
            <div key={exam.id} className="card bg-gray-800 p-4 rounded-lg">
              <h2 className="text-white text-lg font-bold">{exam.title}</h2>
              <p className="text-gray-400">{exam.description}</p>
            </div>
          )) || <div>No exams available.</div>
        )}
      </div>
    </div>
  );
};

export default Exam;
