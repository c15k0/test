<?php

/**
 * Class CNL
 */
final class CNL {
    /**
     * @var \DateTime
     */
    private $currentDate;

    /**
     * @return DateTime
     */
    public function getCurrentDate(): \DateTime
    {
        return $this->currentDate;
    }

    /**
     * @param \DateTime $currentDate
     */
    public function setCurrentDate(\DateTime $currentDate): void
    {
        $this->currentDate = $currentDate;
    }

    public function __construct() {
        $this->setCurrentDate(new \DateTime());
    }

    public function calculateNextDrawDate() : \DateTime {
        $dayOfWeek = $this->getCurrentDate()->format('w');
        $hour = $this->getCurrentDate()->format('G');
        $minutes = $this->getCurrentDate()->format('i');
        $nextDrawDate = clone $this->getCurrentDate();
        // Calculates the next possible date
        switch($dayOfWeek) {
            case 0: // Sunday
            case 2: // Tuesday
                if($hour >= 21 || ($hour >= 21 && $minutes >= 30)) {
                    $nextDrawDate->modify((integer)$dayOfWeek === 0 ? '+2 days' : '+5 days');
                }
                break;
            case 1: // Monday
            case 6: // Saturday
                $nextDrawDate->modify('+1 days');
                break;
            case 3: $nextDrawDate->modify('+4 days'); break; // Wednesday
            case 4: $nextDrawDate->modify('+3 days'); break; // Thursday
            case 5: $nextDrawDate->modify('+2 days'); break; // Friday
        }
        $nextDrawDate->setTime(21, 30, 0, 0);
        return $nextDrawDate;
    }
}