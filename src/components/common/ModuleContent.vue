<template>
  <section class="sec" >
             <div class="content-wrapper">
                <div class="content-heading">
                    <slot name="title"></slot>
                    <small >
                      <slot name="description"></slot>
                    </small>
                </div>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="row">
                                <div class="col-md-1 manage-btn" id="create_app_button" >
                                  <slot name="buttons"></slot>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default"  id="table_app">
                            <div class="panel-body">
                                <div id="table_wrapper" class="dataTables_wrapper form-inline no-footer" >
                                  <slot name="content"></slot>
                                  <slot></slot>
                                </div>
                            </div>
                    </div>
                </div>
             </div>
  </section>
</template>
<script>
export default {
  name: "module-content"
};
</script>
