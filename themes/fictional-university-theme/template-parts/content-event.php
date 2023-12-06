<div class="event-summary">
    <a class="event-summary__date t-center" href="<?php the_permalink(); ?>">
        <?php 
        $eventDate = new DateTime(get_field('event_date'));
        $eventMonth = $eventDate->format('M');
        $eventDay = $eventDate->format('d');
        ?>
      <span class="event-summary__month"><?php 
      echo $eventMonth;
      ?></span>
      <span class="event-summary__day"><?php echo $eventDay; ?></span>
    </a>
    <div class="event-summary__content">
      <h5 class="event-summary__title headline headline--tiny"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h5>
      <p><?php 
            if(has_excerpt()){
              echo get_the_excerpt();
            } else {
            echo wp_trim_words(get_the_content(), 15);
            } ?> <a href="<?php echo get_post_type_archive_link('event'); ?>" class="nu gray">Learn more</a></p>
    </div>
</div>