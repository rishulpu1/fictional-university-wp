<?php 
get_header();
while(have_posts()){
    the_post();
?>

<div class="page-banner">
      <div class="page-banner__bg-image" style="background-image: url(<?php echo get_theme_file_uri('images/ocean.jpg'); ?>)"></div>
      <div class="page-banner__content container container--narrow">
        <h1 class="page-banner__title"><?php the_title(); ?></h1>
        <div class="page-banner__intro">
          <p>Keep up with our latest news.</p>
        </div>
      </div>
    </div>
    <div class="container container--narrow page-section">
        <div class="metabox metabox--position-up metabox--with-home-link">
            <p>
                <a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('program'); ?>"><i class="fa fa-home" aria-hidden="true"></i> All Programs</a> <span class="metabox__main"><?php the_title(); ?></span>
            </p>
        </div>
        <div class="generic-content">
            <p><?php the_content(); ?></p>
        </div>
        <?php 
            $today = Date('Ymd');
            $homePageEvents = new WP_Query(array(
              'posts_per_page' => 2,
              'post_type' => 'event',
              'meta_key' => 'event_date',
              'orderby' => 'meta_value_num',
              'order' => 'ASC',
              'meta_query' => array(
                array(
                  'key' => 'event_date',
                  'compare' => '>=',
                  'value' => $today,
                  'type' => 'numeric'
                ),
                array(
                    'key' => 'related_program',
                    'compare' => 'LIKE',
                    'value' => '"' . get_the_ID() . '"'
                )
              )
            ));

            while($homePageEvents->have_posts()){
              $homePageEvents->the_post();?>
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
            <?php } wp_reset_postdata();
          ?>
    </div>



<?}

get_footer();
?>