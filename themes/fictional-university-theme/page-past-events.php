<?php 

get_header();
pageBanner(array(
    'title' => 'Past Events',
    'subtitle' => 'Recap of our past events'
  ));
?>
    
    <div class="container container--narrow page-section">
      <?php 
        $today = Date('Ymd');
        $pastEvents = new WP_Query(array(
          'paged' => get_query_var('paged', 1),   
          'post_type' => 'event',
          'meta_key' => 'event_date',
          'orderby' => 'meta_value_num',
          'order' => 'ASC',
          'meta_query' => array(
            array(
              'key' => 'event_date',
              'compare' => '<',
              'value' => $today,
              'type' => 'numeric'
            )
          )
        ));
        while($pastEvents->have_posts()){
          $pastEvents->the_post(); ?>
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
                    <p><?php echo wp_trim_words(get_the_content(), 15) ?> <a href="<?php the_permalink(); ?>" class="nu gray">Learn more</a></p>
                  </div>
                </div>
        <?php }
        echo paginate_links(array(
            'total' => $pastEvents->max_num_pages
        ));
      ?>
    </div>
<?php
get_footer();
?>