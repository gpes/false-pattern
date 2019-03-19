
package br.edu.ifpb.gpes.fp.detection;

import br.edu.ifpb.gpes.fp.detection.readers.FileBenchmarking;
import br.edu.ifpb.gpes.shared.Benchmarking;

/**
 *
 * @author natan
 */
public class Loader {
    public static void main(String[] args) {
        FileBenchmarking fileBenchmarking = new FileBenchmarking();
        Benchmarking readOutput = fileBenchmarking.readOutput();
    
        System.out.println(readOutput);
    }
}
