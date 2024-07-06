import prisma from "@calcom/prisma";
import { BookingStatus } from "@calcom/prisma/enums";
import dayjs from "@calcom/utils/dayjs";

export const checkIsFirstSeat = async ({
  uid,
  eventTypeId,
  reqBodyStart,
}: {
  uid?: string;
  eventTypeId: number;
  reqBodyStart: string;
}) => {
  const booking = await prisma.booking.findFirst({
    where: {
      OR: [
        {
          uid,
        },
        {
          eventTypeId,
          startTime: new Date(dayjs(reqBodyStart).utc().format()),
        },
      ],
      status: BookingStatus.ACCEPTED,
    },
  });

  if (booking) return false;
  return true;
};