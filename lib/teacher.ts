export const isTeacher = (userId: string | null) => {
  return userId === process.env.NEXT_TEACHER_ID;
};
